<?php

function calculateAge($birthdate)
{
    $birthDate = new DateTime($birthdate);
    $currentDate = new DateTime();
    $age = $currentDate->diff($birthDate)->y;
    return $age;
}
