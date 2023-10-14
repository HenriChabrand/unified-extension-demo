import axios from 'axios'; 

type CardColor = 'SUCCESS' | 'WARNING' | 'DANGER' | 'INFO' | 'DEFAULT';

class CardContent {
    type: string;
    label: string;
    value: string;
    color?: CardColor;

    constructor(type: string, label: string, value: string) {
        this.type = type;
        this.label = label;
        this.value = value;
    }

    setValue(value: string): void {
        this.value = value;
    }

    setLabel(label: string): void {
        this.label = label;
    }

    setColor(color: CardColor): void {
        if (this.type === 'status') {
            if (!['SUCCESS', 'WARNING', 'DANGER', 'INFO', 'DEFAULT'].includes(color)) {
                throw new Error('Invalid status color');
            }
            this.color = color;
        } else {
            throw new Error('SetColor is only allowed for CardContent of type "status"');
        }
    }
}

class Card {
    title: string;
    contents: CardContent[];

    constructor(title: string) {
        this.title = title;
        this.contents = [];
    }

    setTitle(title: string): void {
        this.title = title;
    }

    newText(label: string, value: string): CardContent {
        let newTextContent = new CardContent('text', label, value);
        this.contents.push(newTextContent);
        return newTextContent;
    }

    newStatus(label: string, value: string, color: CardColor): CardContent {
        let newStatusContent = new CardContent('status', label, value);
        newStatusContent.setColor(color);
        this.contents.push(newStatusContent);
        return newStatusContent;
    }
}

class CardBuilder {
    cards: Card[];
    apiKey: string;
    requestId: string;

    constructor(requestId: string, apiKey: string) {
        if (!apiKey || !requestId) {
          throw new Error('Both apiKey and requestId are required');
        }
        this.cards = [];
        this.apiKey = apiKey;
        this.requestId = requestId;
    }

    newCard(title: string): Card {
        let newCard = new Card(title);
        this.cards.push(newCard);
        return newCard;
    }

    async build(): Promise<boolean> {
    const dataToBeSent = {
      request_id: this.requestId,
      cards: this.cards.map((card) => ({
        title: card.title,
        contents: card.contents
      }))
    };

    console.log(dataToBeSent)
console.log("CALL")
try {
    const response = await axios({
            method: 'POST',
            url: 'https://83avl41zwi.execute-api.eu-west-3.amazonaws.com/default/unifiedExtensionCardBuilder',
            headers: {
                'x-api-key': this.apiKey
            },
            data: dataToBeSent
        });
        console.log("RESPONSE")
        console.log(response.data) 
    } catch (error) {
        console.log("AXIOS ERROR");
        console.log(error.message);
        if (error.response) {
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    }

  }
}



export { CardBuilder, Card, CardContent }
