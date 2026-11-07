import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { events } from '../../src/data/events';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import ScreenHeader from '../../src/components/ScreenHeader';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = events.find(
    (item) => item.id === Number(id)
  );

 
  if (!event) {
    return (
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, padding: 20 }}
      >
        <Stack.Screen options={{ title: 'Event not found' }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Event not found
        </Text>
        <Text>No event with id {id}.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{ flex: 1, padding: 20 }}
    >
      <ScreenHeader title={event.title} showBack />
      <Stack.Screen options={{ title: event.title }} />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        {event.title}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Date: {event.date}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Place: {event.place}
      </Text>

      <Text style={{ fontSize: 16 }}>
        Available seats: {event.seats}
      </Text>
    </SafeAreaView>
  );
}
