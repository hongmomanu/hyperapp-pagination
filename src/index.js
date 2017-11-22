import { h, app } from "hyperapp";
import './index.css'

const makePaginationView = (t, s, c, a) => {
  if (t <= s) {
    return Array(t)
      .fill(0)
      .map((v, i) => (
        <div actived={c === i + 1} key={i} onclick={e => a({ index: i + 1 })}>
          {i + 1}
        </div>
      ));
  } else {
    const halfPage = parseInt(s / 2);
    var arrView = [];
    if (c - halfPage > 2) {
      arrView = arrView.concat(
        [
          <div class={`page-item flex-item ${(c === 1)?'page-actived':''}`} key={1} onclick={e => a({ index: 1 })}>
            {1}
          </div>,
          <div class={`page-more flex-item `} onclick={e => a({ index: parseInt((c - halfPage + 1) / 2) })} />
        ].concat(
          Array(halfPage + 1).fill(0).map((v, i) => (
            <div
              class = {`page-item flex-item ${(c === i + c - halfPage)?'page-actived':''}`}
              key={i + c - halfPage}
              onclick={e => a({ index: i + c - halfPage })}
            >
              {i + c - halfPage}
            </div>
          ))
        )
      );
    } else {
      arrView = arrView.concat(
        Array(c).fill(0).map((v, i) => (
          <div
            class = {`page-item flex-item ${(c === i + 1)?'page-actived':''}`}
            key={i + 1}
            onclick={(e) => a({ index: i + 1 })}
          >
            {i + 1}
          </div>
        ))
      );
      //arrView = arrView.concat([]);
    }
    if (c + halfPage < t - 1) {
      arrView = arrView
        .concat(
          Array(halfPage).fill(0).map((v, i) => (
            <div
              class = {`page-item flex-item ${(c === i + c + 1)?'page-actived':''}`}
              onclick={e => a({ index: i + c + 1 })}
            >
              {i + c + 1}
            </div>
          ))
        )
        .concat([
          <div class = {"page-more flex-item"} onclick={e => a({ index: parseInt((c + t) / 2) })} />,
          <div class = {`page-item flex-item ${(c === t)?'page-actived':''}`} actived={c === t} key={t} onclick={e => a({ index: t })}>
            {t}
          </div>
        ]);
    } else {
      arrView = arrView.concat(
        Array(t - c).fill(0).map((v, i) => (
          <div
            class = {`page-item flex-item ${(c === c + i + 1)?'page-actived':''}`}
            key={c + i + 1}
            onclick={e => a({ index: c + i + 1 })}
          >
            {c + i + 1}
          </div>
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
    ? <div  class={`main-default-class ${stys}`}>
        <div class = {`page-prev flex-item ${(currentpage===1)?'page-nav-disabled':''}`}  onclick={(e)=>click({index:currentpage-1})} />
        {makePaginationView(totalpage, showpages, currentpage, click)}
        <div class = {`page-next flex-item ${(currentpage===totalpage)?'page-nav-disabled':''}`} onclick={(e)=>click({index:currentpage+1})} />
      </div>
    : ""
};
