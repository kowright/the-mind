import { Checkbox } from "expo-checkbox";
import { useGame } from "../../hooks/useGame";
import { websocketService } from "../../services/websocketService";
import { ClientAction } from "../../shared/types/gameAction";
import { GameSetting } from "../../shared/types/gameSettings";
import { theme, themeStyles } from "../../theme/theme";
import { Text, View, StyleSheet } from 'react-native';

interface SettingItemProps {
    settingName: string;
    settingDescription: string;
    settingType?: GameSetting,
}

export function SettingsItem({ settingDescription, settingName, settingType }: SettingItemProps) {
    const { state } = useGame();

    const isChecked = state.gameSettings[settingType];

    function setSetting() {
        websocketService.send({
            type: "SETTINGS",
            setting: settingType
        } as ClientAction);
    }

    return (
        <View style={styles.container}>
            {settingType && <Checkbox
                testID={`checkbox-${settingType}`}
                value={isChecked}
                onValueChange={setSetting}
                color={isChecked ? theme.color.checkbox.checkBoxFill : theme.color.checkbox.checkboxOutline}
            />}
            <View style={styles.text}>
                <Text style={themeStyles.bodyTitle}>{settingName}</Text>
                <Text style={styles.description}>{settingDescription}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    text: {
        flex: 1,
        gap: 2
    },
    description: {
        ...themeStyles.small,
        flexShrink: 1
    }
});