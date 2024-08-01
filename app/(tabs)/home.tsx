import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import useUserDoc from "@/hooks/useUserDoc";
import { useFirestoreDB } from "@/hooks/useFirestoreDB";

export default function Home() {
  const router = useRouter();
  const { userDoc } = useUserDoc();
  const headerHeight = useHeaderHeight();

  const handleClick = () => {
    router.replace("/onboarding");
  };

   // Get current day (or however you want to determine the day)
   const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const { data: exercisesForDay, isLoading, error } = useFirestoreDB().useExercisesForDay(currentDayName);
  
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View className="flex-1 items-center justify-center mx-3">
        <View className="justify-center w-full m-3 rounded-md p-3 border-b-2 border-r-2 overflow-hidden relative bg-white">
          <Text className="text-2xl">Hi, buddy!</Text>
          {userDoc?.workoutPlan ? (
            <>
              {/* if there is workout schedule */}
              <Text className="text-lg">Ready to hit some PR's?</Text>
              <TouchableOpacity onPress={() => {}}>
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

          <View className="absolute right-0 bottom-0 h-16 w-16">
            <View className="absolute right-[-34px] bottom-[10px] w-[170px] transform -rotate-45 bg-primary py-1"></View>
          </View>
        </View>
        <View className="">
          <Text>Todays Workout</Text>
        </View>
      </View>
    </ScrollView>
  );
}

