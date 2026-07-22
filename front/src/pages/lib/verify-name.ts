export function verifyName(name: string): { message: string; isAccepted: boolean } {
  const trimmedName = name.trim().toLowerCase();

  if (trimmedName.length === 0) {
    return { message: 'Кажется, кто-то оставил поле пустым', isAccepted: false };
  }

  if (acceptedNames.includes(trimmedName)) {
    return { message: 'Ооо, какие люди! Вам всегда рады', isAccepted: true };
  }

  return { message: 'Кажется, войти пытается не крутышка🤨', isAccepted: false };
}

const acceptedNames = ['polina', 'полина', 'poly', 'поля'];
