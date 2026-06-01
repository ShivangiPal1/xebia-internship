import EmptyState from "../components/EmptyState.jsx";

function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      message="The page you are looking for does not exist. Head back home to view campus items."
    />
  );
}

export default NotFound;
