from dotenv import load_dotenv
from langchain_ollama import ChatOllama

load_dotenv()

llm = ChatOllama(
    model="llama3.1:8b",
    temperature=0,
)

messages = [
    (
        "system",
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
    ),
    ("human", "I love programming."),
]
ai_msg = llm.invoke(messages)
print(ai_msg)
