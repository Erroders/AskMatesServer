const Answer = require("../models/Answer.model.js");

// -------------------------------------------------------------------
// -----------------------------------
// Create a new Answer
// -----------------------------------
exports.create = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content cannot be empty!",
		});
	}
	// Create Answer using constructor
	const newAnswer = new Answer({
		...req.body,
		correct: "I",
		upVotes: 0,
		downVotes: 0,
	});
	// Save answer in the Database
	Answer.create(newAnswer, (error, answerData) => {
		if (error) {
			res.status(500).send({
				message:
					error.message ||
					"Internal error occured while creating the Answer.",
			});
		} else {
			res.status(200).send(answerData);
		}
	});
};

// -----------------------------------
// Update Answer with given Id
// -----------------------------------
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content cannot be empty!",
		});
	}
	// Create updated answer
	const answerId = req.params.answerId;
	const updatedAnswer = req.body;
	// Save answer in the Database
	Answer.updateById(
		answerId,
		updatedAnswer,
		(error, answerData) => {
			if (error) {
				if (error.kind === "not_found") {
					res.status(404).send({
						message: `Cannot find answer with id ${answerId}`,
					});
				} else {
					res.status(500).send({
						message:
							error.message ||
							"Internal error occured while updating the Answer.",
					});
				}
			} else {
				res.status(200).send(answerData);
			}
		}
	);
};

// -----------------------------------
// Upvote an Answer
// -----------------------------------
exports.upvote = (req, res) => {
	const answerId = req.params.answerId;
	Answer.upvote(answerId, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with id ${answerId}`,
				});
			} else {
				res.status(500).send({
					message:
						error.message ||
						"Internal error occured while upvoting the Answer.",
				});
			}
		} else {
			res.status(200).send(answerData);
		}
	});
};

// -----------------------------------
// Downvote an Answer
// -----------------------------------
exports.downvote = (req, res) => {
	const answerId = req.params.answerId;
	Answer.downvote(answerId, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with id ${answerId}`,
				});
			} else {
				res.status(500).send({
					message:
						error.message ||
						"Internal error occured while downvoting the Answer.",
				});
			}
		} else {
			res.status(200).send(answerData);
		}
	});
};

// -----------------------------------
// Mark correct Answer
// -----------------------------------
exports.markCorrect = (req, res) => {
	const answerId = req.params.answerId;
	Answer.markCorrect(answerId, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with id ${answerId}`,
				});
			} else {
				res.status(500).send({
					message:
						error.message ||
						"Internal error occured while correcting the Answer.",
				});
			}
		} else {
			res.status(200).send(answerData);
		}
	});
};

// -----------------------------------
// Mark incorrect Answer
// -----------------------------------
exports.markIncorrect = (req, res) => {
	const answerId = req.params.answerId;
	Answer.markIncorrect(answerId, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with id ${answerId}`,
				});
			} else {
				res.status(500).send({
					message:
						error.message ||
						"Internal error occured while incorrecting the Answer.",
				});
			}
		} else {
			res.status(200).send(answerData);
		}
	});
};

// -----------------------------------
// Delete an existing Answer
// -----------------------------------
exports.delete = (req, res) => {
	const answerId = req.params.answerId;
	Answer.deleteById(answerId, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with id ${answerId}`,
				});
			} else {
				res.status(500).send({
					message: `Internal error occured while deleting the answer with id ${answerId}`,
				});
			}
		} else {
			res.send({
				message: `Answer with id ${answerId} deleted sucessfully.`,
				answerData,
			});
		}
	});
};

// -----------------------------------
// Delete an Answer by questionId
// -----------------------------------
exports.deleteByQuestionId = (req, res) => {
	if (!req.query.questionId) {
		console.log(
			"Query Parameter questionId is not recieved"
		);
		return;
	}
	const questionId = req.query.questionId;
	Answer.deleteByQuestionId(
		questionId,
		(error, answerData) => {
			if (error) {
				if (error.kind === "not_found") {
					res.status(404).send({
						message: `Cannot find answer with questionId ${questionId}`,
					});
				} else {
					res.status(500).send({
						message: `Internal error occured while deleting the answer with questionID ${questionId}`,
					});
				}
			} else {
				res.send({
					message: `Answer with questionId ${questionId} deleted sucessfully.`,
					answerData,
				});
			}
		}
	);
};

// -----------------------------------
// Delete an Answer by username
// -----------------------------------
exports.deleteByUsername = (req, res) => {
	if (!req.query.username) {
		console.log("Query Parameter username is not recieved");
		return;
	}
	const username = req.query.username;
	Answer.deleteByUsername(username, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with username ${username}`,
				});
			} else {
				res.status(500).send({
					message: `Internal error occured while deleting the answer with username ${username}`,
				});
			}
		} else {
			res.send({
				message: `Answer with username ${username} deleted sucessfully.`,
				answerData,
			});
		}
	});
};

// -----------------------------------
// Get an existing Answer by question Id
// -----------------------------------
exports.getByQuestionId = (req, res) => {
	if (!req.query.questionId) {
		console.log(
			"Query Parameter questionId is not recieved"
		);
		return;
	}
	const questionId = req.query.questionId;
	Answer.getByQuestionId(
		questionId,
		(error, answerData) => {
			if (error) {
				if (error.kind === "not_found") {
					res.status(404).send({
						message: `Cannot find answer with questionId ${questionId}`,
					});
				} else {
					res.status(500).send({
						message: `Internal error occured while fetching the answer with questionId ${questionId}`,
					});
				}
			} else {
				res.status(200).send(answerData);
			}
		}
	);
};

// -----------------------------------
// Get an existing Answer by username
// -----------------------------------
exports.getByUsername = (req, res) => {
	if (!req.query.username) {
		console.log("Query Parameter username is not recieved");
		return;
	}
	const username = req.query.username;
	Answer.getByUsername(username, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with username ${username}`,
				});
			} else {
				res.status(500).send({
					message: `Internal error occured while fetching the answer with username ${username}`,
				});
			}
		} else {
			res.status(200).send(answerData);
		}
	});
};
// -------------------------------------------------------------------
