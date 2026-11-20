import { Pressable, Text, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useRef, type ElementRef } from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  saved: boolean;
};

export default function EventRow({
  event,
  onPress,
  onToggleSaved,
  saved,
}: EventRowProps) {

  const swipeableRef = useRef<ElementRef<typeof Swipeable>>(null);

  return (
     <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={60}
      renderRightActions={() => (
       
        <Pressable
          onPress={() => {
            onToggleSaved();
            swipeableRef.current?.close();
          }}
          style={styles.actionButton}
        >
          <Text>{saved ? 'Unsave' : 'Save'}</Text>
        </Pressable>
      )}
      >
         <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={LinearTransition}
        >
      <Pressable
        onPress={onPress}
        onLongPress={onToggleSaved}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        >
        <Text>{event.title}</Text>
        <Text>{event.date} · {event.place}</Text>
        {saved && <Animated.Text entering={ZoomIn}>★ Saved</Animated.Text>}
      </Pressable>
      </Animated.View>
    </Swipeable>
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
  actionButton: {
  minHeight: 44,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  marginBottom: 10,
  backgroundColor: '#dbeafe',
  borderRadius: 10,
},
});
