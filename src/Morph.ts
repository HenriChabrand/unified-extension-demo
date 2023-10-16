import axios from 'axios'; 

type CardColor = 'SUCCESS' | 'WARNING' | 'DANGER' | 'INFO' | 'DEFAULT';
type ActionType = 'request' | 'open_url' | 'open_url_in_iframe';

class Morph {
  apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('An API key is required');
    }
    this.apiKey = apiKey;
  }

  newCardBuilder(requestId: string): CardBuilder {
    return new CardBuilder(requestId, this.apiKey);
  }
}


class Action {
  type: ActionType;
  name: string;
  url: string;

  constructor(type: ActionType, name: string, url: string) {
    this.type = type;
    this.name = name;
    this.url = url;
  }
}

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
    actions: Action[]; 

    constructor(title: string) {
        this.title = title;
        this.contents = [];
        this.actions = []; 
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

    addAction(type: ActionType, name: string, url: string): Action {
        let newAction = new Action(type, name, url);
        this.actions.push(newAction);
        return newAction;
    }
}

class CardBuilder {
    cards: Card[];
    apiKey: string;
    requestId: string;
    actions: Action[];
  
    constructor(requestId: string, apiKey: string) {
        if (!apiKey || !requestId) {
          throw new Error('Both apiKey and requestId are required');
        }
        this.cards = [];
        this.apiKey = apiKey;
        this.requestId = requestId;
        this.actions = [];
    }

    newCard(title: string): Card {
        let newCard = new Card(title);
        this.cards.push(newCard);
        return newCard;
    }

    addHeaderAction(type: ActionType, name: string, url: string): Action {
      let newHeaderAction = new Action(type, name, url);
      this.actions.push(newHeaderAction);
      return newHeaderAction;
    }

    async build(): Promise<boolean> {
    const cardExtension = {
      header:{
        actions: this.actions
      },
      cards: this.cards.map((card) => ({
        title: card.title,
        contents: card.contents,
        actions: card.actions
      }))
    };

    try {
      const response = await axios({
        method: 'POST',
        url:`https://tlgbrx45cg.execute-api.eu-west-3.amazonaws.com/v0/requests/${this.requestId}/cards`,
        headers: {
          'x-api-key': this.apiKey
        },
        data: cardExtension
      });

      // Check the HTTP status code
      // between 200-299 inclusive indicate success
      if (response.status >= 200 && response.status < 300) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}



export { Morph, CardBuilder, Card, CardContent }
