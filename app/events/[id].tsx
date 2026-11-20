
import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEvents } from '../../src/hooks/useEvents';
import ScreenHeader from '../../src/components/ScreenHeader';
import HolidayNote from '../../src/components/HolidayNote';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: events,
    isPending,
    isError,
    error,
    refetch,
  } = useEvents();

  if (isPending) {
    return (
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, padding: 20 }}
      >
        <ScreenHeader title="Events" showBack />
        <ActivityIndicator size="large" />
        <Text style={{ textAlign: 'center', marginTop: 12 }}>
          Loading events
        </Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, padding: 20 }}
      >
        <ScreenHeader title="Events" showBack />

        <Text style={{ fontSize: 20, marginBottom: 12 }}>
          Could not load events
        </Text>

        <Text style={{ marginBottom: 16 }}>
          {error.message}
        </Text>

        <Button title="Try again" onPress={() => { refetch(); }} />
      </SafeAreaView>
    );
  }

  const event = events?.find(
    (item) => item.id === Number(id)
  );

  if (!event) {
    return (
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, padding: 20 }}
      >
        <Stack.Screen options={{ title: 'Event not found' }} />
        <ScreenHeader title="Events" showBack />

        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Event not found
        </Text>

        <Text>No event with id {id}</Text>
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

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 16,
        }}
      >
        {event.title}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Date: {event.date}
      </Text>

      <HolidayNote date={event.date} />

      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Place: {event.place}
      </Text>

      <Text style={{ fontSize: 16 }}>
        Available seats: {event.seats}
      </Text>
    </SafeAreaView>
  );
}
