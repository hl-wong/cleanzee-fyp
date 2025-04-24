import { CommonActions } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigateTo(navigation, stack, name, params) {
  navigation?.navigate(stack, { screen: name, params });
}

export function goBack(navigation) {
  navigation?.goBack();
}

export function resetTo(navigation, route, params = {}) {
  const routes = Array.isArray(route)
    ? route.map((r) => ({ name: r.name, params: r.params || {} }))
    : [{ name: route, params }];

  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      })
    );
  } else if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      })
    );
  }
}
