import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { format, differenceInMilliseconds } from "date-fns";

function getCountdown(deadline) {
  if (!deadline) return "00:00:00";

  const diff = differenceInMilliseconds(deadline, +Date.now());
  return format(diff, "HH:mm:ss");
}

function ItemBox(props) {
  const [countdownValue, setCountdownValue] = useState(
    getCountdown(props.deadline)
  );

  useEffect(() => {
    const deadlineInterval = setInterval(() => {
      setCountdownValue(getCountdown(props.deadline));
    }, 1000);

    return () => {
      clearInterval(deadlineInterval);
    };
  }, []);

  return (
    <StyledItemBox
      onMouseEnter={props.onHoverEnter}
      onMouseLeave={props.onHoverLeave}
      container
      css={css`
        opacity: ${!props.deadline ? 0.6 : 1};
      `}
      xs={12}
    >
      <Image item src={props.image} xs={6} />
      <Info item xs={6}>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
        <Price>
          <strike
            css={css`
              opacity: 0.6;
            `}
          >
            {props.price} €
          </strike>{" "}
          {Math.round(props.price * 0.8)} €
        </Price>
        <BottomSection container xs={12}>
          <Grid item xs={6}>
            <Buy
              css={css`
                width: 100%;
              `}
              variant="outlined"
            >
              BUY
            </Buy>
          </Grid>
          <Grid
            css={css`
              display: flexbox;
              align-items: center;
              justify-content: center;
            `}
            item
            xs={6}
          >
            <Countdown>{countdownValue}</Countdown>
          </Grid>
        </BottomSection>
      </Info>
      {!props.deadline ? <Overlay /> : null}
    </StyledItemBox>
  );
}

const StyledItemBox = styled(Grid)`
  position: relative;
  margin: 1rem 0;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;

  &:hover {
    transition: border-color 0.35s ease-in-out;
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

const Info = styled(Grid)`
  position: relative;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;
const Description = styled.div`
  margin-top: 0.5rem;
`;
const Price = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
`;
const BottomSection = styled(Grid)`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
`;
const Buy = styled(Button)``;
const Countdown = styled(Grid)``;

const Image = props => (
  <Grid
    css={css`
      height: 0;
      padding-bottom: 50%;
      position: relative;
      overflow: hidden;
    `}
    {...props}
  >
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}
    >
      <img
        css={css`
          max-width: 100%;
          max-height: 100%;
          margin: 0 auto;
          display: block;
        `}
        src={props.src}
      />
    </div>
  </Grid>
);

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.15);
`;

export default ItemBox;
