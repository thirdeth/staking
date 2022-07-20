import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const WarningIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 36 36"
    sx={{
      ...sx,
      width: '36px',
      height: '36px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5688 4.80124C14.1062 5.20178 13.5703 5.60689 12.9684 5.85724C12.3627 6.10915 11.6987 6.19852 11.0923 6.23838C10.6951 6.26448 10.2585 6.27142 9.85168 6.27788H9.85167H9.85166C9.65426 6.28101 9.46385 6.28404 9.28832 6.28909C8.06322 6.32433 7.31943 6.47019 6.89503 6.8946C6.47208 7.31754 6.33276 8.04319 6.30165 9.26058C6.29746 9.42486 6.29501 9.60163 6.29247 9.785C6.2867 10.2013 6.28047 10.6516 6.25222 11.067C6.21045 11.6811 6.11606 12.351 5.85672 12.9702C5.59964 13.5841 5.19348 14.1259 4.78905 14.5944C4.51318 14.914 4.19851 15.2424 3.90666 15.547L3.90661 15.5471C3.77991 15.6793 3.65751 15.8071 3.54446 15.9277C3.14511 16.3537 2.82145 16.7308 2.59668 17.0954C2.37596 17.4534 2.28613 17.7434 2.28613 18C2.28613 18.2552 2.37695 18.5491 2.60168 18.9144C2.82963 19.285 3.15721 19.6686 3.55798 20.098C3.67667 20.2251 3.80584 20.3603 3.93943 20.5001L3.93948 20.5002L3.93955 20.5003C4.22669 20.8008 4.5342 21.1227 4.80167 21.4316C5.20221 21.8942 5.60732 22.4301 5.85767 23.032C6.10958 23.6377 6.19895 24.3017 6.23881 24.9082C6.26491 25.3053 6.27184 25.7419 6.27831 26.1487C6.28144 26.3461 6.28446 26.5366 6.28951 26.7121C6.32475 27.9372 6.47062 28.681 6.89503 29.1054C7.31797 29.5283 8.04361 29.6676 9.26101 29.6988C9.4253 29.703 9.60208 29.7054 9.78545 29.7079C10.2017 29.7137 10.652 29.7199 11.0674 29.7482C11.6815 29.79 12.3514 29.8843 12.9706 30.1437C13.5845 30.4008 14.1264 30.8069 14.5948 31.2114C14.9144 31.4872 15.2428 31.8019 15.5475 32.0937C15.6797 32.2205 15.8075 32.3429 15.9281 32.4559C16.3541 32.8553 16.7312 33.179 17.0958 33.4037C17.4539 33.6245 17.7439 33.7143 18.0004 33.7143C18.2556 33.7143 18.5495 33.6235 18.9148 33.3987C19.2854 33.1708 19.6691 32.8432 20.0984 32.4424C20.2255 32.3238 20.3606 32.1947 20.5003 32.0612L20.5006 32.0609L20.5006 32.0609L20.5011 32.0605C20.8015 31.7735 21.1232 31.4661 21.432 31.1987C21.8947 30.7982 22.4305 30.3931 23.0325 30.1427C23.6381 29.8908 24.3021 29.8015 24.9086 29.7616C25.3057 29.7355 25.7423 29.7286 26.1491 29.7221H26.1491H26.1492L26.1495 29.7221C26.3468 29.719 26.5371 29.7159 26.7125 29.7109C27.9376 29.6757 28.6814 29.5298 29.1058 29.1054C29.5288 28.6824 29.6681 27.9568 29.6992 26.7394C29.7034 26.5751 29.7058 26.3983 29.7084 26.215C29.7141 25.7987 29.7204 25.3484 29.7486 24.933C29.7904 24.3189 29.8848 23.649 30.1441 23.0298C30.4012 22.4159 30.8074 21.8741 31.2118 21.4056C31.4877 21.086 31.8023 20.7576 32.0942 20.4529C32.2209 20.3207 32.3433 20.1929 32.4564 20.0723C32.8557 19.6463 33.1794 19.2692 33.4042 18.9046C33.6249 18.5465 33.7147 18.2565 33.7147 18C33.7147 17.7448 33.6239 17.4509 33.3992 17.0856C33.1712 16.715 32.8436 16.3313 32.4429 15.902C32.3242 15.7749 32.195 15.6396 32.0614 15.4998L32.0613 15.4998C31.7742 15.1992 31.4667 14.8773 31.1992 14.5684C30.7986 14.1057 30.3935 13.5699 30.1432 12.968C29.8913 12.3623 29.8019 11.6983 29.762 11.0918C29.7359 10.6947 29.729 10.2582 29.7225 9.85133V9.8513V9.85126L29.7225 9.85088C29.7194 9.6536 29.7164 9.46332 29.7113 9.2879C29.6761 8.06279 29.5302 7.31901 29.1058 6.8946C28.6829 6.47165 27.9572 6.33234 26.7398 6.30123C26.5755 6.29703 26.3988 6.29458 26.2154 6.29204C25.7991 6.28628 25.3488 6.28004 24.9334 6.25179C24.3193 6.21002 23.6494 6.11563 23.0302 5.8563C22.4163 5.59921 21.8745 5.19305 21.406 4.78862C21.0865 4.51277 20.758 4.19812 20.4534 3.90629L20.4534 3.90622C20.3211 3.77951 20.1933 3.6571 20.0727 3.54404C19.6468 3.14469 19.2696 2.82102 18.905 2.59625C18.547 2.37553 18.257 2.28571 18.0004 2.28571C17.7452 2.28571 17.4513 2.37652 17.086 2.60125C16.7155 2.8292 16.3318 3.15679 15.9024 3.55755C15.7754 3.67618 15.6402 3.80528 15.5005 3.93879L15.5004 3.93892L15.5003 3.93901C15.1997 4.22619 14.8778 4.53374 14.5688 4.80124ZM16.0381 0.897779C16.5928 0.556497 17.2512 0.285706 18.0004 0.285706C18.7483 0.285706 19.4025 0.553471 19.9545 0.893742C20.4999 1.22997 20.9987 1.6707 21.4406 2.08496C21.5968 2.23142 21.7435 2.37202 21.8851 2.5078C22.1691 2.78011 22.4329 3.033 22.7129 3.2747C23.1223 3.62813 23.4765 3.87488 23.8028 4.01154C24.1237 4.14596 24.5387 4.22032 25.0691 4.2564C25.4306 4.28098 25.7866 4.28576 26.1721 4.29094H26.1721H26.1721C26.3691 4.29358 26.5738 4.29633 26.7909 4.30188C27.932 4.33104 29.4644 4.42476 30.52 5.48038C31.5742 6.53455 31.6774 8.08094 31.7105 9.23039C31.7172 9.46469 31.7206 9.68361 31.7238 9.89349C31.7294 10.2659 31.7347 10.6098 31.7577 10.9607C31.7927 11.4928 31.864 11.8975 31.9898 12.1999C32.1171 12.506 32.3569 12.85 32.7112 13.2593C32.9476 13.5324 33.1943 13.7902 33.4602 14.0683L33.4602 14.0684C33.6025 14.2171 33.7502 14.3716 33.9049 14.5373C34.3217 14.9838 34.7646 15.4881 35.1026 16.0376C35.4439 16.5924 35.7147 17.2507 35.7147 18C35.7147 18.7479 35.4469 19.4021 35.1067 19.9541C34.7704 20.4995 34.3297 20.9983 33.9154 21.4402C33.769 21.5964 33.6284 21.743 33.4926 21.8847L33.4926 21.8847C33.2203 22.1688 32.9674 22.4325 32.7257 22.7125C32.3723 23.1219 32.1255 23.476 31.9889 23.8024C31.8545 24.1233 31.7801 24.5382 31.744 25.0687C31.7194 25.4302 31.7146 25.7862 31.7095 26.1717C31.7068 26.3687 31.7041 26.5734 31.6985 26.7905C31.6694 27.9316 31.5756 29.464 30.52 30.5196C29.4659 31.5738 27.9195 31.677 26.77 31.7101C26.5357 31.7168 26.3168 31.7201 26.1069 31.7233C25.7346 31.729 25.3906 31.7342 25.0397 31.7573C24.5077 31.7923 24.1029 31.8636 23.8005 31.9894C23.4944 32.1167 23.1504 32.3565 22.7411 32.7108C22.468 32.9472 22.2101 33.1939 21.932 33.4598C21.7833 33.602 21.6288 33.7498 21.4632 33.9044C21.0166 34.3213 20.5123 34.7641 19.9628 35.1022C19.408 35.4435 18.7497 35.7143 18.0004 35.7143C17.2525 35.7143 16.5983 35.4465 16.0463 35.1062C15.5009 34.77 15.0021 34.3293 14.5602 33.915C14.404 33.7686 14.2574 33.628 14.1158 33.4922C13.8317 33.2199 13.5679 32.967 13.2879 32.7253C12.8785 32.3718 12.5244 32.1251 12.1981 31.9884C11.8771 31.854 11.4622 31.7797 10.9317 31.7436C10.5702 31.719 10.2142 31.7142 9.82873 31.709C9.63174 31.7064 9.42703 31.7037 9.20992 31.6981C8.06883 31.6689 6.53644 31.5752 5.48081 30.5196C4.42665 29.4654 4.3234 27.919 4.29034 26.7696C4.2836 26.5353 4.28027 26.3164 4.27708 26.1065C4.27141 25.7341 4.26618 25.3902 4.24311 25.0393C4.20814 24.5072 4.13679 24.1025 4.01103 23.8001C3.8837 23.494 3.64394 23.1499 3.28963 22.7407C3.05323 22.4677 2.80664 22.2098 2.54077 21.9318L2.54066 21.9317L2.54062 21.9316C2.39839 21.7829 2.25064 21.6284 2.09598 21.4627C1.67911 21.0162 1.23628 20.5119 0.898206 19.9624C0.556924 19.4076 0.286133 18.7493 0.286133 18C0.286133 17.2521 0.553898 16.5979 0.894169 16.0459C1.23039 15.5005 1.67112 15.0017 2.08539 14.5598C2.23184 14.4036 2.37245 14.2569 2.50822 14.1153C2.78053 13.8313 3.03342 13.5675 3.27513 13.2875C3.62856 12.8781 3.87531 12.5239 4.01197 12.1976C4.14638 11.8767 4.22075 11.4617 4.25682 10.9313C4.28141 10.5698 4.28619 10.2138 4.29137 9.82834V9.82831V9.82828C4.29401 9.6313 4.29676 9.4266 4.30231 9.20949C4.33147 8.06841 4.42519 6.53601 5.48081 5.48038C6.53498 4.42622 8.08137 4.32298 9.23082 4.28991C9.46512 4.28317 9.68404 4.27984 9.89393 4.27665H9.89394H9.89395C10.2663 4.27098 10.6102 4.26575 10.9611 4.24269C11.4932 4.20771 11.8979 4.13637 12.2003 4.0106C12.5064 3.88327 12.8505 3.64352 13.2597 3.2892C13.5328 3.05275 13.7907 2.80611 14.0688 2.54019L14.0688 2.54015L14.069 2.53997C14.2177 2.39781 14.3721 2.25013 14.5377 2.09555C14.9843 1.67869 15.4885 1.23585 16.0381 0.897779ZM18.0004 9.28571C18.5527 9.28571 19.0004 9.73342 19.0004 10.2857V19.2857C19.0004 19.838 18.5527 20.2857 18.0004 20.2857C17.4481 20.2857 17.0004 19.838 17.0004 19.2857V10.2857C17.0004 9.73342 17.4481 9.28571 18.0004 9.28571ZM19.929 25.0714C19.929 26.1365 19.0655 27 18.0004 27C16.9353 27 16.0718 26.1365 16.0718 25.0714C16.0718 24.0063 16.9353 23.1428 18.0004 23.1428C19.0655 23.1428 19.929 24.0063 19.929 25.0714Z"
      fill="currentColor"
    />
  </SvgIcon>
);