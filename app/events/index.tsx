import { FlatList, View, TextInput, Text } from 'react-native';
import { router } from 'expo-router';
import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../src/components/ScreenHeader';

export default function EventsScreen() {
    const [query, setQuery] = useState('');
    const [savedIds, setSavedIds] = useState<number[]>([]);
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
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}
    edges={['top', 'bottom']}>
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
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
            <EventRow
                event={item}
                onPress={() => router.push(`/events/${item.id}`)}
                onLongPress={() => toggleSaved(item.id)}
                saved={savedIds.includes(item.id)}
            />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 24 }}>
            No events match
          </Text>
        }
      />
    </SafeAreaView>
  );
}