import "../styles/list-item.css";

interface ListItemProps {
  text: string;
}

export const ListItem = ({ text }: ListItemProps) => {
  return (
    <li className="list-item" data-testid="list-item">
      {text ?? "No entry"}
    </li>
  );
};

export default ListItem;
