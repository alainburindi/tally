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
    await Choice.create({
      name: choice,
      voteId: vote.id,
    });
  }

  return sendResponse(res, 201, "vote created", { vote: vote });
};

const viewVote = async (req, res) => {
  const vote = await Vote.findOne({
    where: { id: req.params.id },
    include: [Choice],
  });

  if (!vote) return sendResponse(res, 404, "vote not found");

  return sendResponse(res, 200, "voute found", { vote: vote });
};

const submitChoice = async (req, res) => {
  const { id } = req.body;
  const choice = await Choice.findByPk(id);
  if (!choice) return sendResponse(res, 400, "Invalid choice");
  choice.votes += 1;
  await choice.save();
  return sendResponse(res, 200, "choice submitted successfully");
};
export { createVote, viewVote, submitChoice };
