from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaEmbeddings


model_name = "BAAI/bge-small-en"
model_kwargs = {"device": "cpu"}
encode_kwargs = {"normalize_embeddings": True}
transformer = HuggingFaceEmbeddings(
    model_name=model_name, model_kwargs=model_kwargs, encode_kwargs=encode_kwargs
)

embedding = transformer.embed_query("Test embedding example")
print("HuggingFace:", embedding)

model_name = "llama3.1:8b"
model_kwargs = {"temperature": 0}
transformer = OllamaEmbeddings(model=model_name, **model_kwargs)

embedding = transformer.embed_query("Test embedding example")
print("Ollama:", embedding)
