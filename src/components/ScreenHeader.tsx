import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  showBack?: boolean;
};

export default function ScreenHeader({
  title,
  showBack = false,
}: Props) {
  return (
    <View style={{
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    }}>
      {showBack && (
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 18, marginRight: 20 }}>
            ← Back
          </Text>
        </Pressable>
      )}
      <Text style={{ fontSize: 20, fontWeight: '600' }}>
        {title}
      </Text>
    </View>
  );
}