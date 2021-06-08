const newRoomEndpoint = `${window.location.origin}/api/rooms`;

async function createRoom() {
  /*  const exp = Math.round(Date.now() / 1000) + 60 * 30;
  const options = {
    properties: {
      exp: exp,
    },
  };
  let response = await fetch(newRoomEndpoint, {
      method: "POST",
      body: JSON.stringify(options),
      mode: "cors",
    }),
    room = await response.json();
  return room; */

  return { url: "https://josephblais.daily.co/DingusTown" };
}

export default { createRoom };
