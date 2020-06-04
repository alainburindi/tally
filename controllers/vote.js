import { validateVote } from "../helpers/validation";
import sendResponse from "../helpers/sendResponse";
import models from "../models";

const { Vote, Choice } = models;

const createVote = async (req, res) => {
  const { error, value } = validateVote(req.body);

  if (error) return sendResponse(res, 400, error.message);

  const vote = await Vote.create({
    name: value.name,
    userId: req.user.id,
  });

  for (const choice of value.choices) {
    const c = await Choice.create({
      name: choice,
      VoteId: vote.dataValues.id,
    });
    console.log(c.dataValues, vote.id);
  }

  return sendResponse(res, 201, "vote created", { vote: vote });
};

const viewVote = async (req, res) => {
  const vote = await Vote.findOne({
    where: { id: req.params.id },
    include: [Choice],
  });
  const choices = await Choice.findAll();

  if (!vote) return sendResponse(res, 404, "vote not found");

  return sendResponse(res, 200, "voute found", {
    vote: vote,
    isOwner: req.user?.id == vote.userId,
  });
};

const submitChoice = async (req, res) => {
  const { id } = req.body;
  if (!id) return sendResponse(res, 400, "the choice id is required");

  const choice = await Choice.findByPk(id);
  if (!choice) return sendResponse(res, 400, "Invalid choice");
  choice.votes += 1;
  await choice.save();
  return sendResponse(res, 200, "choice submitted successfully");
};

const deleteVote = async (req, res) => {
  const { id } = req.body;

  const vote = await Vote.findOne({
    where: { id, userId: req.user.id },
  });

  if (!vote) return sendResponse(res, 404, "vote not found");

  await Choice.destroy({ where: { VoteId: id } });

  await Vote.destroy({ where: { id } });

  return sendResponse(res, 200, "deleted successfully");
};

const getUserVotes = async (req, res) => {
  const votes = await Vote.findAll({
    where: { userId: req.user.id },
    include: [Choice],
  });

  if (!votes)
    return sendResponse(res, 404, "you haven't created any vote so far");

  return sendResponse(res, 200, "Your Votes", { votes });
};

const getAll = async (req, res) => {
  const votes = await Vote.findAll({ include: [Choice] });
  return sendResponse(res, 200, " Votes list", { votes });
};

export { createVote, viewVote, submitChoice, deleteVote, getUserVotes, getAll };
