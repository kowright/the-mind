import { useState, ReactNode } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { IconText } from "./iconText";
import { theme } from "../../theme/theme";

interface ToggleTextProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function ToggleText({ title, children, defaultOpen = false }: ToggleTextProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View>
          <Pressable onPress={() => setOpen(v => !v)}>
              {({ pressed, hovered }) => {
                  const altColor = pressed
                      ? theme.color.toggleIcon.press
                      : hovered
                          ? theme.color.toggleIcon.hover
                          : open
                              ? theme.color.toggleIcon.open
                              : theme.color.toggleIcon.close;

                  return (
                      <View style={styles.header}>
                          <IconText
                              iconFirst
                              iconName="hare.fill"
                              altColor={altColor}
                              text={title}
                          />
                      </View>
                  );
              }}
          </Pressable>
          

      {open && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 6,
  },
  arrow: {
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    paddingLeft: 20,
    paddingTop: 6,
  },
});