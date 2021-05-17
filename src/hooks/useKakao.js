import { useEffect } from "react";

const useKakao = () => {
  useEffect(() => {
    Kakao.init(process.env.KAKAO_KEY);

    return () => {
      Kakao.cleanup();
    };
  }, []);
 
  const handleMessageSend = (invitationCode) => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "runrun",
        description: "너는?",
        link: {
          webUrl: `http://localhost:3000/lobby/${invitationCode}`,
        },
        imageUrl: "",
      },
      buttons: [
        {
          title: "게임 참여하기",
          link: {
            webUrl: `http://localhost:3000/lobby/${invitationCode}`,
          }
        }
      ]
    });
  };

  return { handleMessageSend };
};

export default useKakao;
