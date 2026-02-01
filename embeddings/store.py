# from langchain_chroma import Chroma

# # pip install -qU langchain-chroma

# vector_store = Chroma(
#     collection_name="example_collection",
#     embedding_function=embeddings,
#     persist_directory="./chroma_langchain_db",  # Where to save data locally, remove if not necessary
# )

from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

# Extract (Ingest) - generate documents
texts = [
    "Chroma is an open-source embedding database.",
    "LangChain helps build LLM-powered apps.",
    "Vector stores make similarity search fast.",
]
documents = [Document(page_content=t) for t in texts]

# Transform - split documents
splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
split_documents = splitter.split_documents(documents)

# Load - create embeddings; persist documents at Chroma store.
embeddings = OllamaEmbeddings(model="llama3.1:8b")
vector_store = Chroma(
    collection_name="test_collection",
    embedding_function=embeddings,
    persist_directory="chroma_db_test",
)
vector_store.add_documents(split_documents)

# Search
query = "What is Chroma?"
results = vector_store.similarity_search(query, k=10)
for d in results:
    print(d.page_content)
