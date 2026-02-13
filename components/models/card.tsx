import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';

interface CardViewProps {
    card: Card;
    onPlay: (card: Card) => void;
    onSelected: (card: Card) => void;
    onPress: (card: Card) => void;
}

export function CardView({ card, onPlay }: CardViewProps) {
    return (
        <>
            <Text>CARD</Text>
            <Text>{card.number}</Text>
        </>
    );
}



// TODO:  might need a handview 

// ideally looks like this
/*
<CardView
    card={card}
    onPress={() =>
        dispatch({ type: 'PLAY_CARD', cardId: card.id })
    }
/>
*/