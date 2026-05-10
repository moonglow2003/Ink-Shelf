import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
    }

    // Inject a system prompt to give the AI personality
    const systemPrompt = {
      role: 'system',
      content: 'You are the InkShelf AI Assistant. You help users find and explore indie comics and manga. You are friendly, enthusiastic about comic books, and use a neo-brutalist, slightly edgy but very helpful tone.'
    };

    const apiMessages = [systemPrompt, ...messages];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Groq API Error:', errorData || response.statusText);
      return NextResponse.json({ error: errorData?.error?.message || 'Failed to communicate with AI provider' }, { status: response.status });
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]) {
      console.error('Invalid Groq response:', data);
      return NextResponse.json({ error: 'Invalid response format from Groq' }, { status: 500 });
    }

    return NextResponse.json({ result: data.choices[0].message.content });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
