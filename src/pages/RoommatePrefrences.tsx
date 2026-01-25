export function RoommatePrefrences() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //handle form submission here
  }

  return (
    <form onSubmit={async (e) => {handleSubmit(e);}}>
      <h2>Roommate Preferences</h2>
      {/* Add form fields for roommate preferences here */}
      <button type="submit">Save Preferences</button>
    </form>
  );
}