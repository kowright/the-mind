import { ScrollView, Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { StyleSheet } from 'react-native';
import { websocketService } from '../services/websocketService';
import { DiscardPileView } from '../components/models/discardPile';
import { CardView } from '../components/models/card';
import { theme, themeStyles } from '../theme/theme';
import { useResponsiveTheme } from '../hooks/useResponsiveTheme';
import { ButtonView } from '../components/models/button';
import { IconText } from '../components/models/iconText';
import { useEffect } from 'react';
import { soundService } from '../services/soundService';

export default function GameResult() {
    const { state } = useGame();
    const theme = useResponsiveTheme();
    const wonGame = state.gameOutcome === 'won';

    const title = wonGame ? 'YOU WON!' : 'WOW, YOU LOST.';
    const levelAchieved = wonGame ? state.winLevel : `L${state.level.number}/${state.winLevel}`
    const snarkyText = wonGame ? 'YOU ALL REALLY ARE ONE MIND!' : 'YOU DEFINITELY COULD HAVE TRIED HARDER BRUH';

    useEffect(() => {
        if (!state) return;

        if (wonGame) {
            soundService.play('success')
        } else {
            soundService.play('lose');
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={{gap: 32}}>
                <Text style={wonGame ? styles.wonContainer : styles.lostContainer}>
                    {title}
                </Text>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'black'
                }}>
                    <IconText iconFirst={true} iconName='heart.fill' text={state.lives} />
                    <IconText iconFirst={true} iconName='staroflife.fill' text={state.shuriken} />
                    <IconText iconFirst={true} iconName='chart.bar.fill' text={`${levelAchieved}`} />
               
                </View>
                <DiscardPileView keepStacked={false} />
            </View>

            {state.shurikenedCards.length > 0 && (
                <View style={styles.removedSection}>
                    <Text style={styles.text}>Removed Cards:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1,paddingVertical: 12, paddingHorizontal: 12, overflow: 'visible', justifyContent: 'center' }}

                    >
                        {state.shurikenedCards.map((card, index) => (
                            <View
                                key={card.id}
                                style={{
                                    marginLeft: index === 0 ? 0 : theme.size.cardWidth,
                                }}
                            >
                                <CardView
                                    card={card}
                                    index={index}
                                    total={state.lastRemovedCards.length + 1}
                                    discarded
                                    rotate={false}
                                    
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            <View style={styles.bottomSection}>
                <Text style={themeStyles.small}>{snarkyText}</Text>
                <ButtonView
                    text="NEW GAME?"
                    onPress={() => websocketService.send({ type: 'GAME_RESTART' })}
                    variant="primary"
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wonContainer: {
        ...themeStyles.heading,
        backgroundColor: theme.color.gameResult.win,
        textAlign: 'center',
    },
    lostContainer: {
        ...themeStyles.heading,
        backgroundColor: theme.color.gameResult.lose,
        textAlign: 'center',

    },
    text: {
        ...themeStyles.body
    },
    container: {
        flex: 1,
        backgroundColor: theme.color.gameBackground.backgroundColor,   
    },
    removedSection: {
        marginVertical: 16,
    },
    bottomSection: {
        alignItems: 'center',
        gap: 12,
        marginTop: 'auto',
        paddingBottom: 44,
    },
});