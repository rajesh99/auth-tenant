const InlineCode = ({ children }) => {
  return (
    <code className="text-red-500 bg-gray-200 font-semibold px-2 py-[3px] rounded-lg text-sm">
      {children}
    </code>
  );
};

export default InlineCode;
