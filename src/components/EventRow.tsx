import { Pressable, Text, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  saved: boolean;
};

export default function EventRow({
  event,
  onPress,
  onLongPress,
  saved,
}: EventRowProps) {
  return (
    <Pressable
    onPress={onPress}
  onLongPress={onLongPress}
  style={({ pressed }) => [
    styles.card,
    pressed && styles.cardPressed,
  ]}
    >
      <Text>{event.title}</Text>
      <Text>{event.date} · {event.place}</Text>
      {saved && <Text>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
  },
});
