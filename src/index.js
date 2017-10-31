import { h, app } from "hyperapp";
import picostyle from "picostyle";
const style = picostyle(h);
const Div = style("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  userSelect: "none",
  justifyContent: "center"
}));
const Item = style("div")(({ actived }) => ({
  //position: 'absolute',
  display: "flex",
  width: "25px",
  padding: "2px 2px 2px 2px",
  cursor: "pointer",
  fontSize: "12px",
  border: "1px solid lightblue",
  alignItems: "center",
  borderRadius: "5px",
  fontFamily: "Arial",
  justifyContent: "center",
  color: "gray",
  backgroundColor: `${actived ? "#2db7f5" : "white"}`,
  height: "25px",
  marginRight: "5px",
  ":hover": {
    color: "#2db7f5",
    borderColor: "#2db7f5"
  }
}));
const Prev = style(Item)(({disabled}) => ({
  "::after": {
    content: "'\\2039'",
    display: "block"
  },
  pointerEvents: `${disabled?'none':'all'}`
}));
const Next = style(Prev)(({disabled}) => ({
  "::after": {
    content: "'\\203A'"
  }
}));
const More = style(Item)(() => ({
  border: "0px",
  "::after": {
    content: "'\\2022\\2022\\2022'"
  }
}));

const makePaginationView = (t, s, c, a) => {
  if (t <= s) {
    return Array(t)
      .fill(0)
      .map((v, i) => (
        <Item actived={c === i + 1} key={i} onclick={e => a({ index: i + 1 })}>
          {i + 1}
        </Item>
      ));
  } else {
    const halfPage = parseInt(s / 2);
    var arrView = [];
    if (c - halfPage > 2) {
      arrView = arrView.concat(
        [
          <Item actived={c === 1} key={1} onclick={e => a({ index: 1 })}>
            {1}
          </Item>,
          <More onclick={e => a({ index: parseInt((c - halfPage + 1) / 2) })} />
        ].concat(
          Array(halfPage + 1).fill(0).map((v, i) => (
            <Item
              actived={c === i + c - halfPage}
              key={i + c - halfPage}
              onclick={e => a({ index: i + c - halfPage })}
            >
              {i + c - halfPage}
            </Item>
          ))
        )
      );
    } else {
      arrView = arrView.concat(
        Array(c).fill(0).map((v, i) => (
          <Item
            actived={c === i + 1}
            key={i + 1}
            onclick={e => a({ index: i + 1 })}
          >
            {i + 1}
          </Item>
        ))
      );
      //arrView = arrView.concat([]);
    }
    if (c + halfPage < t - 1) {
      arrView = arrView
        .concat(
          Array(halfPage).fill(0).map((v, i) => (
            <Item
              actived={c === i + c + 1}
              key={i + c + 1}
              onclick={e => a({ index: i + c + 1 })}
            >
              {i + c + 1}
            </Item>
          ))
        )
        .concat([
          <More onclick={e => a({ index: parseInt((c + t) / 2) })} />,
          <Item actived={c === t} key={t} onclick={e => a({ index: t })}>
            {t}
          </Item>
        ]);
    } else {
      arrView = arrView.concat(
        Array(t - c).fill(0).map((v, i) => (
          <Item
            actived={c === c + i + 1}
            key={c + i + 1}
            onclick={e => a({ index: c + i + 1 })}
          >
            {c + i + 1}
          </Item>
        ))
      );
    }

    return arrView;
  }
};

export const Pagination = ({
  stys,
  pagesize,
  totalpage,
  currentpage,
  showpages,
  click
}) => {
  return totalpage > 0
    ? <Div stys={stys}>
        <Prev disabled={currentpage===1} onclick={(e)=>click({index:currentpage-1})} />
        {makePaginationView(totalpage, showpages, currentpage, click)}
        <Next disabled={currentpage===totalpage} onclick={(e)=>click({index:currentpage+1})} />
      </Div>
    : "";
};
