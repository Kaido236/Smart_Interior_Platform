function FloatingChatButton() {
  return (
    <button className="floating-chat-button" type="button" aria-label="Open chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 18v-2a8 8 0 1 1 3 3l-3 1Z" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" />
      </svg>
    </button>
  );
}

export default FloatingChatButton;
