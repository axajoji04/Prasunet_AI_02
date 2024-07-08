import torch
from transformers import BertTokenizer, BertForSequenceClassification

class SentimentAnalyzer:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
        self.model = BertForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')

    def analyze(self, text):
        inputs = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=512,
            truncation=True,
            padding='max_length',
            return_tensors='pt'
        )
        outputs = self.model(**inputs)
        scores = outputs[0][0].detach().numpy()
        scores = torch.nn.functional.softmax(torch.tensor(scores), dim=0)
        return scores

analyzer = SentimentAnalyzer()

def get_sentiment(text):
    scores = analyzer.analyze(text)
    return {
        "very_negative": scores[0].item(),
        "negative": scores[1].item(),
        "neutral": scores[2].item(),
        "positive": scores[3].item(),
        "very_positive": scores[4].item(),
    }
