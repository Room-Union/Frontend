// SVG 파일을 SVGR로 변환할 때 사용하는 설정
export default {
    // SVGProps type 체크 여부
    typescript: true,    
    // 변환 파일 확장자          
    ext: "tsx",          
    // 아이콘 크기를 1em 자동 주입하여 글자 크기에 종속시키는 설정          
    icon: false,           
    // <width height> 포함 설정 => false로 두어 Tailwind로 사이즈 설정하기 위함      
    dimensions: false,   
    // props 전달 위치 => 기본 색상을 덮어 쓰기 위해 end로 설정 ex) <...props Icon className="..."/>          
    expandProps: "end",          
    prettier: false,
    // SVGO 설정
    svgo: true,
    // SVGO 설정
    svgoConfig: {
      plugins: [
        // viewBox 제거 설정 => SVGO가 SVG 최적화할 때 viewBox 제거
        { name: "removeViewBox", active: false },   
        // dimensions 제거 설정 => SVGO가 SVG 최적화할 때 width/height 제거
        { name: "removeDimensions", active: true },
        // inline styles 제거 설정 => SVGO가 SVG 최적화할 때 style 속성 제거
        { name: "removeAttrs", active: true, params: { attrs: "style" } },
      ],
    },
    // assets/icons 아이콘들의 fill/stroke를 currentColor로 치환
    replaceAttrValues: {
      // 기본 검은색 계열
      "#000": "currentColor",
      "#000000": "currentColor",
      "black": "currentColor",
      "#111": "currentColor",
      "#222": "currentColor",
      "#333": "currentColor",
      "#333333": "currentColor",
      
      // 회색 계열
      "#737373": "currentColor",
      "#757575": "currentColor",
      "#A4A4A4": "currentColor",
      "#BBBBBB": "currentColor",
      
      // 녹색 계열
      "#1AA272": "currentColor",
      
      // 흰색은 그대로 유지
      "white": "white",
      "#fff": "white",
      "#ffffff": "white",
      
      // 투명/없음은 그대로 유지
      "none": "none",
      "transparent": "transparent",
      
      // RGB/RGBA 값들
      "rgba(0, 0, 0, 1)": "currentColor",
      "rgba(0, 0, 0, 0.7)": "currentColor",
      "rgba(0, 0, 0, 0.6)": "currentColor",
      "rgb(0, 0, 0)": "currentColor",
      "rgb(255, 255, 255)": "white",
      
      // display-p3 색상 공간 값들
      "color(display-p3 0.4588 0.4588 0.4588)": "currentColor",
      "color(display-p3 0.6413 0.6413 0.6413)": "currentColor"
    },
    // SVG 자체에 Tailwind 베이스 클래스를 기본 부여
    svgProps: {
      className: "inline-block align-middle fill-current", // 기본 사이즈 제거, 색상만 제어
      role: "img",
      "aria-hidden": "true", // 스크린리더 접근성 처리
      viewBox: "0 0 25 24", // assets/icons의 모든 아이콘이 사용하는 viewBox
    },
  };
  