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

export { createVote };
