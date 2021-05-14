export const saveGameClearUserRecord = async ({ id, record }) => {
  const response = await fetch(
    `${process.env.SERVER_PORT}/api/result/${id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...record }),
    }
  );

  const { result } = await response.json();

  return result;
};
