import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";

interface Step {
  id: number;
  content: {};
}

const StepItem = ({ step }: { step: number }) => {
  const { width } = useWindowDimensions();
  return (
    <View className="">
      {/* <Image
        source={require("@/assets/images/t.png")}
        className="object-contain justify-center"
      />
      <View>
        <Text className="text-4xl text-black bg-red-400">
          {item.description}
        </Text>
      </View> */}
    </View>
  );
};

export default StepItem;

// import { View, Text, FlatList, Animated } from "react-native";
// import React, { useRef, useState } from "react";
// import slides from "@/constants/Slides";
// import OnboardingItem from "./OnboardingItem";

// const Onboarding = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const slidesRef = useRef(null);

//   const viewableItemsChanged = useRef((viewableItems: any) => {
//     setCurrentIndex(viewableItems[0].index);
//   }).current;
//   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
//   return (
//     <View className="flex-1 justify-center items-center">
//       <View style={{ flex: 3 }}>
//         <FlatList
//           data={slides}
//           renderItem={({ item }) => <OnboardingItem item={item} />}
//           horizontal
//           showsHorizontalScrollIndicator
//           pagingEnabled
//           bounces={false}
//           keyExtractor={(item) => item.description}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             {
//               useNativeDriver: false,
//             }
//           )}
//           scrollEventThrottle={32}
//           onViewableItemsChanged={viewableItemsChanged}
//           viewabilityConfig={viewConfig}
//           ref={slidesRef}
//         />
//       </View>
//     </View>
//   );
// };

// export default Onboarding;
