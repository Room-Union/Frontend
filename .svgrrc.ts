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
        // Figma에서 export시 추가된 style 속성 제거
        { name: "removeAttrs", active: true, params: { attrs: "style" } },
        // Figma에서 export시 추가된 fill 속성 제거
        { name: "removeAttrs", active: true, params: { attrs: "fill" } },
        // Figma에서 export시 추가된 stroke 속성 제거
        { name: "removeAttrs", active: true, params: { attrs: "stroke" } },
      ],
    },
    // SVG 자체에 Tailwind 베이스 클래스를 기본 부여
    svgProps: {
      // fill 속성을 currentColor로 설정
      fill:"currentColor",
      stroke:"currentColor",
      className: "inline-block align-middle", // 기본 사이즈 제거, 색상만 제어
      role: "img",
      "aria-hidden": "true", // 스크린리더 접근성 처리
      viewBox: "0 0 25 24", // assets/icons의 모든 아이콘이 사용하는 viewBox
    },
  };
  