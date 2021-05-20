import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getGameRecords } from "../../redux/slices/singlePlaySlice";
import PageCard from "../../components/shared/PageCard";
import MainPageLayout from "../../components/MainPageLayout";

const RecordPage = () => {
  const dispatch = useDispatch();
  const records = useSelector(({ single }) => single.records);

  useEffect(() => {
    dispatch(getGameRecords());
  }, []);

  return (
    <MainPageLayout>
      <PageCard width={550} height={600}>
        <CardList>
          <Title>Best Top 7</Title>
          {records.map((record, index) => (
            <Card key={index}>
              <Ranking>{index + 1}</Ranking>
              <Content>{record.username}</Content>
              <Content>{record.score}</Content>
            </Card>
          ))}
        </CardList>
      </PageCard>
    </MainPageLayout>
  );
};

const CardList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;
  width: 80%;
  height: 2.7rem;
  align-items: center;
  padding: 5px 20px;
  justify-content: space-between;
  margin: 0.5rem auto;
  border-radius: 5px;
  border: 1px solid #d6cbbf;
  background: #F3ECE4;
  font-size: 25px;
  box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, 0.2);

  :hover {
    background: #F6F0EB;
  }
`;

const Content = styled.div`
`;

const Ranking = styled.h3`
  font-weight: bold;
`;

const Title = styled.h2`
  margin: 20px 0;
  text-align: center;
  font-size: 30px;
`;

export default RecordPage;
