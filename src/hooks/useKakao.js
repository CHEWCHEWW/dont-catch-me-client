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
          webUrl: `${process.env.PORT}/waiting/${invitationCode}`,
        },
        imageUrl: "",
      },
      buttons: [
        {
          title: "게임 참여하기",
          link: {
            webUrl: `${process.env.PORT}/waiting/${invitationCode}`,
          }
        }
      ]
    });
  };

  return { handleMessageSend };
};

export default useKakao;
