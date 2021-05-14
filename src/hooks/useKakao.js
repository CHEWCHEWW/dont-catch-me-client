import { useEffect } from "react";

const useKakao = () => {
  useEffect(() => {
    Kakao.init(process.env.KAKAO_KEY);
  }, []);

  const handleMessageSend = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "runrun",
        description: "너는?",
        link: {
          webUrl: "http://localhost:3000",
          mobileWebUrl: "",
        },
        imageUrl: "",
      },
      buttons: [
        {
          title: "게임 참여하기",
          link: {
            webUrl: "http://localhost:3000",
            mobileWebUrl: "",
          }
        }
      ]
    });
  };

  return { handleMessageSend };
};

export default useKakao;
