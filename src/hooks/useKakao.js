import { useEffect } from "react";

const useKakao = () => {
  useEffect(() => {
    Kakao.init(process.env.KAKAO_KEY);
  }, []);
 
  const handleMessageSend = (invitationCode) => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "runrun",
        description: "너는?",
        link: {
          webUrl: "http://localhost:3000",
        },
        imageUrl: "",
      },
      buttons: [
        {
          title: "게임 참여하기",
          link: {
            webUrl: "http://localhost:3000",
          }
        }
      ]
    });
  };

  return { handleMessageSend };
};

export default useKakao;
