import itertools
import re


def solve_cryptarithmetic(puzzle):
    puzzle = puzzle.replace(" ", "").upper()

    if "=" not in puzzle:
        return None, "Invalid puzzle format. Use format like SEND+MORE=MONEY"

    left_side, result_word = puzzle.split("=")
    addends = left_side.split("+")

    words = addends + [result_word]
    unique_letters = sorted(set("".join(words)))

    if len(unique_letters) > 10:
        return None, "Too many unique letters. Maximum allowed is 10."

    leading_letters = set(word[0] for word in words)

    for perm in itertools.permutations("0123456789", len(unique_letters)):
        letter_to_digit = dict(zip(unique_letters, perm))

        if any(letter_to_digit[letter] == "0" for letter in leading_letters):
            continue

        numeric_words = []
        for word in words:
            number = "".join(letter_to_digit[ch] for ch in word)
            numeric_words.append(int(number))

        if sum(numeric_words[:-1]) == numeric_words[-1]:
            solution = {
                "mapping": {k: int(v) for k, v in letter_to_digit.items()},
                "addends": numeric_words[:-1],
                "result": numeric_words[-1]
            }
            return solution, None

    return None, "No solution found."


def display_solution(puzzle, solution):
    print("\nPuzzle:", puzzle)
    print("\nValid Letter-Digit Mapping:")
    for letter, digit in sorted(solution["mapping"].items()):
        print(f"{letter} -> {digit}")

    left_side, result_word = puzzle.replace(" ", "").upper().split("=")
    addends = left_side.split("+")

    print("\nComputed Result:")
    for i, word in enumerate(addends):
        number = "".join(str(solution["mapping"][ch]) for ch in word)
        if i < len(addends) - 1:
            print(number)
            print("+")
        else:
            print(number)
    print("= ")
    print(solution["result"])


def main():
    print("Crypt Arithmetic Puzzle Solver (CSP)")
    print("Example input: SEND+MORE=MONEY")

    puzzle = input("Enter the puzzle: ").strip()
    solution, error = solve_cryptarithmetic(puzzle)

    if error:
        print("\n", error)
    else:
        display_solution(puzzle, solution)


if __name__ == "__main__":
    main()
