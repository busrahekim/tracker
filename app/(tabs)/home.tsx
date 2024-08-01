import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { useFirestoreDB } from "@/hooks/useFirestoreDB";
import Loading from "@/components/Loading";
import Ribbon from "@/components/Ribbon";
import { useFetchDB } from "@/hooks/useFetchDB";

export default function Home() {
  const router = useRouter();
  const { userDoc, loading } = useFetchDB();
  const headerHeight = useHeaderHeight();

  const handleClick = () => {
    router.replace("/onboarding");
  };

  const currentDayName = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
  });

  const {
    data: exercisesForDay,
    isLoading,
    error,
  } = useFirestoreDB().useExercisesForDay(currentDayName);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View className="flex-1 gap-y-2 justify-center m-3">
        <View className="w-full rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
          <Text className="text-2xl">Hi, buddy!</Text>
          {userDoc?.workoutPlan ? (
            <>
              {/* if there is workout schedule */}
              <Text className="text-lg">Ready to hit some PR's?</Text>
              <TouchableOpacity onPress={handleClick}>
                <Text>add</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* if there is no workout schedule */}
              <Text className="text-lg">
                I would like to know better your workout schedule to help out
                trackking. Why won't we start with that?
              </Text>

              {/* onboarding screen on press, get the details */}
              <TouchableOpacity
                className="mt-4 cursor-pointer"
                onPress={handleClick}
              >
                <Text className="text-lg text-primary font-bold">
                  Edit schedule
                </Text>
              </TouchableOpacity>
            </>
          )}

          <Ribbon />
        </View>
        <View className="">
          <Text className="text-2xl">{currentDayName}</Text>
          <Text>No planned workout for today</Text>
        </View>
      </View>
    </ScrollView>
  );
}
