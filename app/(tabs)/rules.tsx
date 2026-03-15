import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { theme, themeStyles } from '../../theme/theme';
import { ToggleText } from '../../components/models/toggleText';
import { LevelProgression } from '../../components/models/levelProgression';
import { IconText } from '../../components/models/iconText';
import { CardView } from '../../components/models/card';
import { RuleText } from '../../components/models/ruleText';

export default function TabThreeScreen() {

    return (
        <View
            style={styles.screen}
        >
            <Text style={styles.gameTitle}>
                THE MIND
            </Text>
            <Text style={styles.title}>
                RULES
            </Text>
            <ScrollView>
                <ToggleText
                    title='Goal'
                    defaultOpen={false}
                > 
                    <Text style={themeStyles.body}>Work with up to 4 players to win all levels by playing cards in the right order without losing all your lives silently and prove yourselves to be ONE MIND.</Text>
                </ToggleText>

                <ToggleText
                    title='Gameplay'
                    defaultOpen={false}
                >
                    <RuleText>This is a cooperative game where in each level, players must put down all cards in everyone&#39;s hand in one deck in ascending order. Best placed with people in person or where you can see their faces.</RuleText>
                    <RuleText breaks={1}>Players can go in any order to put down cards in ascending order- for example, the pile can be 12-41-82.</RuleText>
                    <RuleText breaks={1}>If a card is not played in order, then a life will be lost for each card that should have been played. For example, if 12 is already played and someone plays 56 but someone had a 41 in their hand, then 1 life is lost. In the same example, if someone plays 56 when 12 is down and someone or multiple people have 22 & 41 in the hands, then 2 lives are lost.</RuleText>
                    <RuleText breaks={1}>The game starts in a ready to play state where players can review their hands and agree to start. After agreeing, the actual game play starts. After all cards are played from all hands without losing all lives, the next round starts immediately and this level cycle loops until all lives are lost or all levels beat.</RuleText>
                    <RuleText breaks={2}>Was it mentioned that you cannot speak?</RuleText>
                </ToggleText>


                <ToggleText
                    title='Phases'
                    defaultOpen={false}
                >
                    <RuleText>The game starts in a preparation phase where players review their cards, check the game stats like lives, shuriken and level and get themselves ready to play. When all players have pressed the ready button, a countdown to the play phas starts</RuleText>
                    <RuleText breaks={1}>In the play phase is where the gameplay happens and cards from players hands are played during the level.</RuleText>
                    <RuleText breaks={1}>The level either ends in a game win if all levels are beat, a game loss if all lives are lost or a level win. All of these lead to the review phase. </RuleText>
                    <RuleText breaks={1}>The review phase is where you see what happened in the level. You will see any rewards you get if it was a level win or if it was a game win or loss, you see what lives, shuriken and level you ended on. All review stages will show you what order the cards were put down in.</RuleText>
                    <RuleText breaks={1}>At the end of the review stage, we either loop back to the preparation phase for the next level if it was a level win or if it was a game win or loss, we go back to the home screen where you can restart the game from the top.</RuleText>
                    <RuleText breaks={2}>If you read up to here from the top, you have enough info to start playing so start trying! Or keep reading. You do you.</RuleText>

                </ToggleText>


                <ToggleText
                    title='Levels'
                    defaultOpen={false}
                >
                    <RuleText>The amount of levels necessary to beat the game are dependent on how many players there are. There are 12 for 2 players, 10 for 3 players and 8 for 4 players.</RuleText>
                    <RuleText breaks={1}>Each level may have a reward attached to it. You can find this at the bottom of the screen when playing. It looks like this:</RuleText>
                    <LevelProgression />
                    <RuleText>You can see for example, once level 3 is beat, you get an extra life.</RuleText>
                    <RuleText breaks={1}>Levels are also denoted by this symbol and can be found at the top of the play screen:</RuleText>
                    <IconText iconFirst={true} iconName='chart.bar.fill' text={`2/12`} />
                    <RuleText>You can see for example, the symbol and numbers mean you are currently on Level 2 out of 12 levels necessary to win.</RuleText>

                </ToggleText>

                <ToggleText
                    title='Cards'
                    defaultOpen={false}
                >
                    <RuleText>There are 100 cards in the deck in total. Each card has 1 number from 1 to 100.</RuleText>
                    <RuleText breaks={1}>During the game, you can play a card either by using the PLAY CARD button or by tapping the first card in the deck. All cards are already sorted for you and automatically plays the first & subsequently lowest card in your hand.</RuleText>

                    <RuleText breaks={1}>Cards are also denoted by this symbol: </RuleText>
                    <RuleText> </RuleText>
                    <CardView
                        card={{
                            id: `rules-1`,
                            number: 50,
                            mistakenlyPlayed: false,
                        }}
                        discarded={true}
                        rotate = {false}
                        index={0}
                        total={1}
                        hideNumbers={false}
                    />
                   
                    <RuleText breaks={1}>You can see that this card is card #50.</RuleText>
                    <RuleText>If this card was played in the wrong order, you will see it like this:</RuleText>
                    <RuleText> </RuleText>
                    <CardView
                        card={{
                            id: `rules-2`,
                            number: 50,
                            mistakenlyPlayed: true,
                        }}
                        discarded={true}
                        rotate={false}
                        index={0}
                        total={1}
                        hideNumbers={false}
                        mistakenPlayerName='Wolfgang'
                    />
                    <RuleText breaks={1}>You can see in the example, any card that is played wrong or was not played when it should have been is marked with who&#39;s hand the card came from and red. </RuleText>


                </ToggleText>

                <ToggleText
                    title='Lives'
                    defaultOpen={false}
                >
                    <RuleText>The amount of lives you get are dependent on how many players there are; it is the same number as the amount of players.</RuleText>
                    <RuleText breaks={1}>Lives are also denoted by this symbol and can be found at the top of the play screen: </RuleText>
                    <IconText iconFirst={true} iconName='hare.fill' text={`2`} />
                    <RuleText>You can see for example, the symbol and number mean you have 2 lives left.</RuleText>
                    <RuleText breaks={1}>You can get more lives dependent on the reward of some levels. You can get a life as a reward in levels 3, 6 & 9.</RuleText>
                </ToggleText>


                <ToggleText
                    title='Shuriken'
                    defaultOpen={false}
                >
                    <RuleText>Shuriken allow players to remove the lowest card from each player&#39;s hand.</RuleText>
                    <RuleText breaks={1}>Only 1 shuriken is given at the start of the game.</RuleText>
                    <RuleText breaks={1}>Shuriken are used when all players agree to use it. You can tell if people want to use it by the thumbs up symbol in the top of the play screen.</RuleText>
                    <RuleText breaks={1}>You can vote to use a shuriken by using the &#39;Vote to use shuriken button&#39; and it will add to that thumbs up tally. You can tap it again to remove your vote.</RuleText>
                    <RuleText breaks={1}>Once all players have agreed to use the shuriken, a screen will come up with the results and then a countdown to resume the game will happen.</RuleText>
                    <RuleText breaks={1}>The cards that were removed from the game will show on the results screen.</RuleText>


                    <RuleText breaks={2}>Shuriken are also denoted by this symbol and can be found at the top of the play screen:</RuleText>
                    <IconText iconFirst={true} iconName='staroflife.fill' text={`2`} />
                    <RuleText>You can see for example, the symbol and number mean you have 2 shuriken left.</RuleText>
                    <RuleText breaks={2}>You can get more shuriken dependent on the reward of some levels. You can get a shuriken as a reward in levels 2, 5 & 7.</RuleText>
                </ToggleText>


                <ToggleText
                    title='Thumbs Up'
                    defaultOpen={false}
                >
                    <RuleText>During the preparation and play screens, there are opportunities to vote on when an event happens</RuleText>
                    <RuleText breaks={1}>During the preparation level phase, players can use the &#39;READY??&#39; button to cast their vote to start the level. During game play, casting a vote will denote interest in using a shuriken.</RuleText>
                    <RuleText breaks={1}>Once the first player&#39;s vote is cast, the thumbs up symbol will be red to signify voting has started. If there are no votes, the thumbs up symbol will be white. The votes are reset after all players voted.</RuleText>
                    <RuleText breaks={1}>The thumbs up is also denoted by this symbol and can be found at the top of the play screen:</RuleText>

                    <IconText iconFirst={true} iconName='hand.thumbsup' altColor={theme.color.gameplayIcon.voted} text={`2`} />
                    <RuleText>You can see for example, the symbol and number mean 2 people voted.</RuleText>

                </ToggleText>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        
        backgroundColor: theme.color.gameBackground.backgroundColor,
    },
    gameTitle: {
        ...themeStyles.gameTitle,
        textAlign: 'center',
        paddingTop: 24,
    },
    title: {
        ...themeStyles.title,
        textAlign: 'center',
        paddingBottom: 16,
    },
});
