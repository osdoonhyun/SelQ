export default function LayoutContainer({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1080px',
        margin: '0 auto',
        justifyContent: 'center',
        fontFamily: 'BMHANNAPro',
      }}
    >
      {children}
    </div>
  );
}
