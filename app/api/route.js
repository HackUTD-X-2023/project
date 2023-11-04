// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

export async function POST(request) {
    const body = await request.json()

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
            {
                "role": "system",
                "content": "Use provided home buyer's financial data such as car payments, student loan payments, gross monthly income, etc., to help the home buyer.\n    •    If LTV is above 80%, recommend a higher down payment or a cheaper home.\n    •    For DTI above 43%, suggest paying off debts or transferring balances to lower interest rate loans.\n    •    If FEDTI is above 28%, advise on reducing the monthly mortgage payment or increasing gross income.\n    •    If rejected, include a personalized suggestion for each buyer on what they can do to meet the necessary criteria.\n    •    Prioritize clarity and conciseness in your output, providing a clear indication of approval or suggestions for improvement.\n    •    Act as a consultant who is talking to a potential home buyer about their options.\n    •    You will be provided the LTV, DTI, FEDTI, and credit score. Do not discuss the calculations of these metrics, only the analysis of them as if you were talking to a potential home buyer.\n    •    At the end of your analysis, provide a brief summary and a statement about the conclusion of your analysis."
            },
            {
                "role": "user",
                "content": createPrompt(body.creditScore, body.ltv, body.dti, body.fedti)
            }
        ],
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return Response.json({ response })
}

function createPrompt(creditScore, ltv, dti, fedti) {
    return `Hello, I need to determine if I am ready to purchase a home based on the following criteria:\n\nCredit rating should be 640 or above.\nLTV (loan-to-value) should be ≤ 80%.\nDTI (debt-to-income ratio) should not exceed 43%.\nFront-end debt to income (FEDTI) should be ≤ 28%.\n\nPlease analyze the data and calculate the LTV, DTI, and FEDTI for each potential buyer. Then, assess whether they meet the criteria for home purchase readiness. If they do not, suggest steps they could take to improve their financial situation.\n\nCredit score: ${creditScore}\nLTV: ${ltv}\nDTI: ${dti}\nFEDTI: ${fedti}`
}