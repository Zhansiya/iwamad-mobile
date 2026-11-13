
import {
  View,
  FlatList,
  TextInput,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import EventRow from '../../src/components/EventRow';
import ScreenHeader from '../../src/components/ScreenHeader';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventsScreen() {
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const {
    data: events = [],
    isPending,
    isError,
    error,
    isRefetching,
    refetch,
  } = useEvents();

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  function toggleSaved(id: number) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  if (isError && isPending) {
    return (
      <SafeAreaView
        style={{ flex: 1, padding: 16 }}
        edges={['top', 'bottom']}
      >
        <ScreenHeader title="Events" showBack />

        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginBottom: 12,
          }}
        >
          Could not load events
        </Text>

        <Text
          style={{
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          {error?.message}
        </Text>

        <View style={{ minHeight: 44, justifyContent: 'center' }}>
          <Button
            title="Try again"
            onPress={() => {
              refetch();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (isPending) {
    return (
      <SafeAreaView
        style={{ flex: 1, padding: 16 }}
        edges={['top', 'bottom']}
      >
        <ScreenHeader title="Events" showBack />

        <ActivityIndicator size="large" />

        <Text
          style={{
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          Loading events
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 16 }}
      edges={['top', 'bottom']}
    >
      <ScreenHeader title="Events" showBack />

      <TextInput
        placeholder="Search events"
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          borderColor: '#cccccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <Text style={{ marginBottom: 12, fontSize: 14 }}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      {isError && (
        <Text style={{ color: 'red', marginBottom: 12 }}>
          Could not refresh events: {error?.message}
        </Text>
      )}

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        refreshing={isRefetching}
        onRefresh={() => {
          refetch();
        }}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
            saved={savedIds.includes(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            No events match
          </Text>
        }
      />
    </SafeAreaView>
  );
}
