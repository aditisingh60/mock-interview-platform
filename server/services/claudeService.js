const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

const evaluateAnswer = async (question, answer, type) => {
    const prompt = `You are an expert technical interviewer. Evaluate the following interview answer and provide structured feedback.

Question Type: ${type}
Question: ${question.title}
Question Description: ${question.description}

Candidate's Answer:
${answer}

Please evaluate this answer and respond with ONLY a valid JSON object in this exact format:
{
  "score": <number between 0-10>,
  "feedback": "<overall feedback in 2-3 sentences>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"],
  "modelAnswer": "<ideal answer in 3-4 sentences>"
}

Scoring guide:
0-3: Poor — missing key concepts
4-5: Below average — partial understanding
6-7: Good — correct but can improve
8-9: Great — thorough and clear
10: Perfect — exceptional answer`;

    const message = await client.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.content[0].text;

    // JSON parse karo
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error("Invalid AI response format");
    }

    const result = JSON.parse(jsonMatch[0]);
    return result;
};

module.exports = { evaluateAnswer };