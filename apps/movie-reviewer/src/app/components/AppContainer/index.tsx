export interface AppContainerProps {
  children: React.ReactNode;
}

export function AppContainer(props: AppContainerProps) {
  return (
    <div className="md:container md:mx-auto md:px-4">
      {props.children}
    </div>
  );
}

export default AppContainer;
