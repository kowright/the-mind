import { Checkbox } from "expo-checkbox";
import { useGame } from "../../hooks/useGame";
import { websocketService } from "../../services/websocketService";
import { ClientAction } from "../../shared/types/gameAction";
import { GameSetting } from "../../shared/types/gameSettings";
import { theme, themeStyles } from "../../theme/theme";
import { Text, View } from 'react-native';

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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {settingType && <Checkbox
                value={isChecked}
                onValueChange={setSetting}
                color={isChecked ? theme.color.checkbox.checkBoxFill : theme.color.checkbox.checkboxOutline}
            />}
            <View style={{ flex: 1, gap: 2 }}>
                <Text style={themeStyles.bodyTitle}>{settingName}</Text>
                <Text style={[themeStyles.small, { flexShrink: 1 }]}>{settingDescription}</Text>
            </View>
        </View>
    );
}
