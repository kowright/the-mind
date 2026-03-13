import { ReactNode } from "react";
import { themeStyles } from "../../theme/theme";
import { Text } from 'react-native';
interface RuleTextProps {
    children: ReactNode;
    breaks?: number;
}

export function RuleText({ children, breaks = 0 }: RuleTextProps) {
    return (
        <Text style={themeStyles.body}>
            {"\n".repeat(breaks)}
            {children}
        </Text>
    );
}